/* eslint-disable no-console */
const isBrowser = typeof window !== 'undefined';
const isDev = process.env.NODE_ENV !== 'production';

function emitEvent(eventName: string, params: Record<string, unknown>) {
  if (!isBrowser) {
    return;
  }

  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;

  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
    return;
  }

  if (isDev) {
    console.log(`[Analytics] ${eventName}`, params);
  }
}

export function trackCTAClick(location: string, provider: string) {
  emitEvent('cta_click', {
    cta_location: location,
    auth_provider: provider,
    event_category: 'engagement',
    event_label: `${location}_${provider}`,
  });
}

export function trackSignUpStarted(provider: string) {
  emitEvent('sign_up_started', {
    auth_provider: provider,
    event_category: 'conversion',
  });
}

export function trackSignUpCompleted(provider: string) {
  emitEvent('sign_up_completed', {
    auth_provider: provider,
    event_category: 'conversion',
  });
}

export function trackError(errorType: string, message: string, provider?: string) {
  emitEvent('error', {
    error_type: errorType,
    error_message: message,
    auth_provider: provider,
    event_category: 'error',
  });
}

export function trackFAQInteraction(questionId: string, questionText: string, action: 'expand' | 'collapse') {
  emitEvent('faq_interaction', {
    question_id: questionId,
    question_text: questionText,
    action,
    event_category: 'engagement',
  });
}

export function trackScrollDepth(sectionName: string, depthPercentage: number) {
  emitEvent('scroll_depth', {
    section_name: sectionName,
    depth_percentage: depthPercentage,
    event_category: 'engagement',
  });
}

export function trackSectionView(sectionName: string) {
  emitEvent('section_view', {
    section_name: sectionName,
    event_category: 'engagement',
  });
}

export function trackPageView(path: string) {
  emitEvent('page_view', {
    page_path: path,
  });
}
