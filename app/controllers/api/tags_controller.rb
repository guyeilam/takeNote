class Api::TagsController < ApplicationController
  def index
    @tags = current_user.tags.all
  end

  def create
    @tag = Tag.new(tag_params)
    @tag.user_id = current_user.id
    
    if @tag.save
      render :show
    else
      render json: @tag.errors.full_messages, status: 422
    end
  end

  def update
    @tag = Tag.find_by(id: params[:id])

    if @tag.update(tag_params)
      render :show
    else
      render json: @tag.errors.full_messages, status: 422
    end
  end

  def destroy
    @tag = Tag.find_by(id: params[:id])
    if @tag
      @tag.destroy
      render :show
    else
      render json: ['Tag does not exist'], status: 500
    end
  end

  def show
    @tag = current_user.tags.find_by(id: params[:id])
    if @tag
      render :show
    else
      render json: ['Tag does not exist.']
    end
  end

  private
  def tag_params
    params.require(:tag).permit(:label)
  end
end