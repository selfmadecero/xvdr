'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChartBarIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    title: '문서 관리 및 추적',
    description: '자동으로 문서 상태를 추적하고, 최신 버전을 관리합니다.',
    icon: DocumentTextIcon,
  },
  {
    title: 'AI 이메일 자동화',
    description:
      '필요한 문서를 놓치지 않고 자동으로 이메일을 보내어 효율적인 소통을 합니다.',
    icon: EnvelopeIcon,
  },
  {
    title: '실시간 성과 추적',
    description:
      '투자 성과를 실시간으로 모니터링하고 대시보드에서 한눈에 파악합니다.',
    icon: ChartBarIcon,
  },
  {
    title: '은행급 보안',
    description:
      'AES-256 암호화와 GDPR/CCPA 규제 준수로 안전한 데이터 관리를 보장합니다.',
    icon: ShieldCheckIcon,
  },
];

const testimonials = [
  {
    quote: 'xVDR 덕분에 우리는 포트폴리오 관리가 훨씬 간편해졌습니다.',
    author: '김투자 대표',
    company: 'ABC Ventures',
  },
  {
    quote: 'AI 이메일 자동화 기능이 정말 혁신적입니다. 시간 절약이 엄청납니다.',
    author: '이성과 파트너',
    company: 'Tech Investment Partners',
  },
];

const pricingPlans = [
  {
    name: '스타터',
    price: '₩490,000',
    period: '/월',
    features: [
      '최대 10개 포트폴리오 관리',
      '기본 문서 관리',
      'AI 이메일 자동화 50건/월',
      '기본 대시보드',
    ],
  },
  {
    name: '프로',
    price: '₩990,000',
    period: '/월',
    features: [
      '무제한 포트폴리오 관리',
      '고급 문서 관리 및 버전 관리',
      'AI 이메일 자동화 무제한',
      '고급 대시보드 및 리포팅',
      '우선 고객 지원',
    ],
    popular: true,
  },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0A0F1E] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-xl bg-white/[0.02] border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                XVDR
              </span>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  기능
                </a>
                <a
                  href="#pricing"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  가격
                </a>
                <a
                  href="#testimonials"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  고객사례
                </a>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 transition-all"
                >
                  무료 체험 시작
                </Link>
              </div>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white/70 hover:text-white p-2"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.05] bg-[#0A0F1E]/95 backdrop-blur-xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                기능
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                가격
              </a>
              <a
                href="#testimonials"
                className="block px-3 py-2 text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                고객사례
              </a>
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-white hover:bg-white/[0.05] rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                무료 체험 시작
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full filter blur-[80px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-gradient-to-r from-cyan-500/30 to-teal-500/30 rounded-full filter blur-[60px] animate-pulse delay-700"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 text-transparent bg-clip-text leading-tight">
            투자 데이터를 효율적으로 관리하고,
            <br className="hidden sm:block" />
            성과를 실시간으로 추적하세요
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
            xVDR은 Seed-Stage와 Early-Stage VC들이 투자 후 성과를 쉽게 관리하고,
            문서 작업을 자동화하는 완벽한 솔루션입니다.
          </p>
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-lg opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-[#0A0F1E] border border-white/10 text-white font-medium">
              <span className="relative z-10 flex items-center text-sm sm:text-base">
                무료로 시작하기
                <ArrowRightIcon className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text mb-4">
              주요 기능
            </h2>
            <p className="text-white/60">
              VC를 위한 최적의 기능들을 제공합니다
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 sm:p-8 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mb-4 sm:mb-6" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text mb-4">
              고객 후기
            </h2>
            <p className="text-white/60">
              xVDR을 사용하는 VC들의 이야기를 들어보세요
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8"
              >
                <p className="text-lg text-white/80 mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-white/60">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text mb-4">
              요금제
            </h2>
            <p className="text-white/60">
              귀사에 맞는 최적의 요금제를 선택하세요
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`backdrop-blur-xl border rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-blue-500/10 to-cyan-400/10 border-blue-500/20'
                    : 'bg-white/[0.02] border-white/[0.05]'
                }`}
              >
                {plan.popular && (
                  <span className="inline-block px-4 py-1 rounded-full text-sm bg-gradient-to-r from-blue-500 to-cyan-400 text-white mb-4">
                    인기
                  </span>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/60 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-white/80"
                    >
                      <CheckCircleIcon className="w-5 h-5 text-blue-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`block text-center py-3 rounded-lg transition-colors ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  시작하기
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 sm:mb-0">
            © 2024 XVDR. All rights reserved.
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors text-center"
            >
              이용약관
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors text-center"
            >
              개인정보처리방침
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors text-center"
            >
              문의하기
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
