class Api::TaggingsController < ApplicationController
  def create
    @tagging = Tagging.new(tagging_params)
    if @tagging.save
      @tag = Tag.find_by(id: @tagging.tag_id)
      @note = Note.find_by(id: @tagging.note_id)
      render :show
    else
      render json: @tagging.errors.full_messages, status: 422
    end
  end

  def index
    @taggings = Tagging.all
  end

  def destroy
    @tagging = Tagging.find_by(note_id: tagging_params[:note_id], tag_id: tagging_params[:tag_id])
    @tag = Tag.find_by(id: @tagging.tag_id)
    @note = Note.find_by(id: @tagging.note_id)
    if @tagging.destroy
      render :show
    else
      render json: @tagging.errors.full_messages, status: 422
    end
  end

  private
  def tagging_params
    params.require(:tagging).permit(:tag_id, :note_id)
  end
end