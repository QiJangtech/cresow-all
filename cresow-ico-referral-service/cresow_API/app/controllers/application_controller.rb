class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found
  rescue_from ActiveRecord::RecordNotUnique, :with => :record_not_unique
  rescue_from ActiveRecord::RecordInvalid, :with => :record_invalid

  def routing_error
    render :json => {:error => "API Route not found"}, status: 404
    return
  end

  def doorkeeper_unauthorized_render_options(error: nil)
    {json: '{"status": "failure", "message":"401 Unauthorized"}'}
  end

  def record_not_found(error, *args)
    render :json => {:error => error.message, :status => args}, status: 404
    return
  end

  def record_not_unique(error)
    render :json => {:error => error.message}, status: 400
    return
  end

  def record_invalid(error)
    render :json => {:error => error.message}, status: 400
    return
  end
end
