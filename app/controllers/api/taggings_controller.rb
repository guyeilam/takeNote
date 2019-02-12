class Api::TaggingsController < ApplicationController
  def show
    
  end

  def index
    @taggings = Tag.find_by(id: params[:tag_id]).taggings
  end

  def destroy

  end

  private
  def tagging_params
    params.require(:tagging).permit(:note_id)
  end
end