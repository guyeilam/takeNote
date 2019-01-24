class Api::NotebooksController < ApplicationController
  before_action :require_signed_in
  
  def index
    @notebooks = current_user.notebooks
  end

  def show
    @notebook = current_user.notebooks.find(params[:id])
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
    @notebook = Notebook.new(notebook_params)

    if @notebook.update_attributes(notebook_params)
      render :show
    else
      render json: @notebooks.errors.full_messages, status: 422
    end
  end

  def destroy
    @notebook = current_user.notebooks.find(params[:id])
    @notebook.destroy

    render :show
  end

  private
  def notebooks_params
    params.require(:notebooks).permit(:title)
  end
end