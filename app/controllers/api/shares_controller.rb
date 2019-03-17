class Api::SharesController < ApplicationController
  def create
    @user = User.find_by(email: share_params[:user_email])
    if !@user
      render json: ["Invalid email"], status: 401
    end

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
    @note = Note.find_by(note_id: share_params[:note_id])
    @share = Share.find_by(user_id: share_params[:user_id], note_id: share_params[:note_id])
    if current_user.id == @note.user.id && @tagging.destroy
      render '/api/notes/show'
    else
      render json: @share.errors.full_messages, status: 422
    end
  end

  private
  def share_params
    params.require(:share).permit(:user_email, :note_id)
  end
end