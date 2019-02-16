class Api::TaggingsController < ApplicationController
  def create
    @tagging = Tagging.new(tagging_params)
    if @tagging.save
      @tag = Tag.find_by(id: @tagging.tag_id)
      render :show
    else
      render json: @tagging.errors.full_messages, status: 422
    end

    
  end

  def index
    @taggings = current_user.taggings.all
  end

  def destroy

  end

  private
  def tagging_params
    params.require(:tagging).permit(:tag_id, :note_id)
  end
end