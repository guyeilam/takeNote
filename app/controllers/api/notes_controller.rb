class Api::NotesController < ApplicationController
  before_action :require_signed_in
  
  def index
    @notes = Notebook.find_by(id: params[:notebook_id]).notes
  end

  private
  def note_params
    params.require(:note).permit(:title, :content)
  end
end