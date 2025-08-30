
import {  Mail, MessageCircle, Phone} from 'lucide-react';


const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                <p className="text-xl text-gray-600">
                We're here to help! Get in touch with our support team.
                </p>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-2">support@learnhub.com</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
                </div>
        
                <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-2">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM PST</p>
                </div>
        
                <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-2">Available 24/7</p>
                <p className="text-sm text-gray-500">Instant support online</p>
                </div>
            </div>
        
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                    </label>
                    <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                    </label>
                    <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Referral Program</option>
                    <option>Course Content</option>
                    <option>Partnership Opportunity</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                    </label>
                    <textarea
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us how we can help you..."
                    ></textarea>
                </div>
                </div>
                <div className="mt-6">
                <button
                    onClick={() => alert('Thank you for your message! We will get back to you within 24 hours.')}
                    className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                    Send Message
                </button>
                </div>
            </div>
        
            <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
                <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-gray-900 mb-2">How do I track my referral earnings?</h3>
                    <p className="text-gray-600 text-sm">
                    You can track all your referral activities, earnings, and withdrawal history in your personal dashboard. 
                    Simply log in and navigate to the "Referrals" or "Earnings" section.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 mb-2">When will I receive my commission payments?</h3>
                    <p className="text-gray-600 text-sm">
                    Commissions are credited to your account after the referred student completes their course purchase. 
                    You can withdraw your earnings once you reach the $50 minimum threshold, and payments are processed within 5 business days.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Can I refer courses to myself or family members?</h3>
                    <p className="text-gray-600 text-sm">
                    Self-referrals are not permitted under our program terms. However, you can refer courses to family members 
                    as long as they are making genuine purchases and you're not circumventing the system.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 mb-2">What happens if a student refunds a course I referred?</h3>
                    <p className="text-gray-600 text-sm">
                    If a referred student requests a refund within our refund policy period, the associated commission 
                    will be deducted from your account. We maintain fair practices for both students and referrers.
                    </p>
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Contact