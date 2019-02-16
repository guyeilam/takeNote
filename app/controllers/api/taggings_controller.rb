class Api::TaggingsController < ApplicationController
  def create
    @tagging = Tagging.new(tagging_params)
    if @tagging.save
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
    params.require(:tagging).permit(:note_id, :tag_id)
  end
end