class Api::TagsController < ApplicationController
  def index
    @tags = Tag.all
  end

  def destroy

  end

  private
  def tag_params
    params.require(:tag).permit(:label)
  end
end