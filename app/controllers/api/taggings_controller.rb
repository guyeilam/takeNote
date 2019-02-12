class Api::TaggingsController < ApplicationController
  def show
    @taggings = Tagging.all
  end

  def destroy

  end

  private
  def tagging_params
    params.require(:tagging).permit(:note_id)
  end
end