'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import axiosClient from '../lib/axiosClient';

export function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Xóa lỗi khi người dùng bắt đầu gõ lại
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Gọi API public không cần Token/Cookie
      await axiosClient.post('/contact/submit', formData);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Tự động tắt thông báo thành công sau 4 giây
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || 'Có lỗi xảy ra khi gửi tin nhắn.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 p-8 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Liên hệ với chúng tôi</h1>
          <p className="text-gray-500">Chúng tôi luôn sẵn sàng lắng nghe. Hãy gửi tin nhắn và chúng tôi sẽ phản hồi sớm nhất có thể.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Form */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Gửi tin nhắn cho chúng tôi</h2>
            
            {isSuccess ? (
              <div className="h-64 flex flex-col items-center justify-center text-center animate-in zoom-in-95">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tin nhắn đã được gửi!</h3>
                <p className="text-gray-500">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi qua email của bạn sớm nhất có thể.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-blue-500 font-medium hover:text-blue-600"
                >
                  Gửi tin nhắn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all disabled:opacity-60"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nguyenvana@example.com"
                      className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all disabled:opacity-60"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Chủ đề</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Chúng tôi có thể giúp gì cho bạn?"
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all disabled:opacity-60"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nội dung tin nhắn</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hãy cho chúng tôi biết chi tiết vấn đề của bạn..."
                    rows={5}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none disabled:opacity-60"
                    disabled={isSubmitting}
                  />
                </div>

                {errorMessage && (
                  <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Gửi tin nhắn
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Info & Hours */}
          <div className="w-full lg:w-96 flex flex-col gap-6">
            
            {/* Contact Information Card */}
            <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg shadow-indigo-200/50">
              <h3 className="text-xl font-bold mb-6">Thông tin Liên hệ</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-indigo-100 mb-0.5">Email</p>
                    <p className="font-medium">25520805@uit.edu.vn</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-indigo-100 mb-0.5">Điện thoại</p>
                    <p className="font-medium">+84 354 519 313</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-indigo-100 mb-0.5">Địa chỉ</p>
                    <p className="font-medium leading-relaxed">
                      Khu phố 34, Phường Linh Xuân, Thành phố Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-500" />
                </div>
                Giờ hoạt động
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                  <span className="text-gray-500">Thứ Hai - Thứ Sáu</span>
                  <span className="font-medium text-gray-900">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                  <span className="text-gray-500">Thứ Bảy</span>
                  <span className="font-medium text-gray-900">9:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Chủ Nhật</span>
                  <span className="font-medium text-red-500">Đóng cửa</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}