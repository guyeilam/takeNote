class Api::NotesController < ApplicationController
  before_action :require_signed_in
  
  def index
    @notes = Note.all
  end

  def show
    @note = Note.find_by(id: params[:id])
    if @note
      render :show
    else
      render json: ['Note does not exist.']
    end
  end

def create
    @note = Note.new(note_params)
    @note.user_id = current_user.id
    @note.notebook_id = current_user.notebooks.sample.id

    if @note.save
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def update
    @note = Note.find_by(id: params[:id])

    if @note.update(note_params)
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def destroy
    @note = Note.find_by(id: params[:id])
    if @note
      @note.destroy
      render :show
    else
      render json: ['Note does not exist'], status: 500
    end
  end


  private
  def note_params
    params.require(:note).permit(:title, :content)
  end
end