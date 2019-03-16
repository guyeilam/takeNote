class Api::NotebooksController < ApplicationController
  before_action :require_signed_in

  def index
    @notebooks = Notebook.all
    @notes = Note.all
  end

  def show
    @notebook = Notebook.find_by(id: params[:id])
    @notes = @notebook.notes
    if @notebook
      render :show
    else
      render json: ['Notebook does not exist.']
    end
  end

  def create
    @notebook = Notebook.new(notebook_params)
    @notebook.user_id = current_user.id
    if @notebook.save
      render :show
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end

  def update
    @notebook = Notebook.find_by(id: params[:id])

    if @notebook.update_attributes(notebook_params)
      render :show
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end

  def destroy
    @notebook = Notebook.find_by(id: params[:id])
    if @notebook
      @notebook.destroy
      render :show
    else
      render json: ['Notebook does not exist'], status: 500
    end
  end

  private
  def notebook_params
    params.require(:notebook).permit(:title)
  end

end