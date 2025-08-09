/*
  # Update courses for affiliate marketing niche

  1. Updates
    - Clear existing courses and insert new affiliate marketing courses
    - Update course prices and content for affiliate marketing
    - Add course unlocking logic support

  2. New Courses
    - Course 1: Affiliate Marketing Fundamentals (₹999)
    - Course 2: Advanced Affiliate Strategies (₹1999) 
    - Course 3: Affiliate Marketing Mastery (₹4000)
    - Course 4: Affiliate Empire Blueprint (₹5000)

  3. Course Unlocking Logic
    - Higher priced courses unlock all lower priced courses
    - Referrals only work for unlocked courses
*/

-- Clear existing courses
DELETE FROM courses;

-- Insert new affiliate marketing courses
INSERT INTO courses (id, title, description, instructor, price, duration, level, rating, total_students, image_url, curriculum) VALUES
(
  '1',
  'Affiliate Marketing Fundamentals',
  'Learn the basics of affiliate marketing, choosing profitable niches, and building your first campaigns.',
  'Sarah Johnson',
  999,
  '8 hours',
  'Beginner',
  4.8,
  15420,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  '["Introduction to Affiliate Marketing", "Choosing Profitable Niches", "Finding Affiliate Programs", "Basic Campaign Setup", "Traffic Generation Basics", "Performance Tracking"]'::jsonb
),
(
  '2', 
  'Advanced Affiliate Strategies',
  'Master advanced affiliate marketing techniques, conversion optimization, and scaling strategies.',
  'Michael Chen',
  1999,
  '12 hours', 
  'Intermediate',
  4.9,
  8850,
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  '["Advanced Campaign Strategies", "Conversion Rate Optimization", "A/B Testing Methods", "Email Marketing Integration", "Social Media Promotion", "Analytics & ROI Tracking"]'::jsonb
),
(
  '3',
  'Affiliate Marketing Mastery', 
  'Complete mastery course covering high-ticket affiliate marketing, automation, and team building.',
  'Jessica Williams',
  4000,
  '20 hours',
  'Advanced',
  4.7,
  6320,
  'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop',
  '["High-Ticket Affiliate Marketing", "Marketing Automation", "Team Building & Outsourcing", "Advanced Traffic Sources", "Funnel Optimization", "Scaling to 6-Figures"]'::jsonb
),
(
  '4',
  'Affiliate Empire Blueprint',
  'Build a complete affiliate marketing empire with multiple income streams, passive income systems, and business automation.',
  'David Rodriguez', 
  5000,
  '30 hours',
  'Expert',
  4.8,
  4750,
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
  '["Building Multiple Income Streams", "Passive Income Systems", "Business Automation", "Advanced Analytics", "Team Management", "Exit Strategies & Scaling"]'::jsonb
);