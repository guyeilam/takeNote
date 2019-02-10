class Api::UsersController < ApplicationController  
  def create
    @user = User.new(user_params)

    if @user.save
      @notebook = Notebook.new(title: "#{@user.email}'s notebook", user_id: @user.id)
      if @notebook.save
        @user.default_notebook = @notebook.id
        @user.save
      end
      signin(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = current_user
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :default_notebook)
  end
end