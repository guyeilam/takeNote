class Api::SharesController < ApplicationController
  def create
    @user = User.find_by(email: share_params[:user_email])
    @share = Share.new(user_id: @user.id, note_id: share_params[:note_id])
    if @share.save
      @note = Note.find_by(id: @share.note_id)
      render '/api/notes/show'
    else
      render json: @share.errors.full_messages, status: 422
    end
  end

  def index
    @notes = current_user.shared_notes
    render '/api/notes/index'
  end

  def destroy
    @note = Note.find_by(id: share_params[:note_id])
    user = User.find_by(email: share_params[:user_email])
    share = Share.find_by(user_id: user.id, note_id: @note.id)
    if current_user.id == @note.user_id && share.destroy
      render '/api/notes/show'
    else
      render json: share.errors.full_messages, status: 422
    end
  end

  private
  def share_params
    params.require(:share).permit(:user_email, :note_id)
  end
end