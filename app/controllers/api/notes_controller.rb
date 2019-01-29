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

  private
  def note_params
    params.require(:note).permit(:title, :content)
  end
end