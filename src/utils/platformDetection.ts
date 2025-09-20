/**
 * Platform Detection Utilities
 *
 * Utilities for detecting device type, operating system, and platform-specific features
 * Used for conditional rendering and platform-specific UI adaptations
 */

// [ANCHOR: platform-types]
export type PlatformType =
  | 'windows'
  | 'macos'
  | 'linux'
  | 'ios'
  | 'android'
  | 'unknown';
export type DeviceType = 'desktop' | 'mobile' | 'tablet';

interface PlatformInfo {
  platform: PlatformType;
  deviceType: DeviceType;
  isMobile: boolean;
  isDesktop: boolean;
  bookmarkShortcut: string;
  userAgent: string;
}

// [ANCHOR: platform-detection]
/**
 * Detect the user's platform and device type
 */
export function detectPlatform(): PlatformInfo {
  // Server-side rendering safety
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      platform: 'unknown',
      deviceType: 'desktop',
      isMobile: false,
      isDesktop: true,
      bookmarkShortcut: 'Ctrl+D',
      userAgent: '',
    };
  }

  const userAgent = navigator.userAgent.toLowerCase();

  // Detect platform
  let platform: PlatformType = 'unknown';

  if (userAgent.includes('mac os x') || userAgent.includes('macintosh')) {
    platform = 'macos';
  } else if (userAgent.includes('windows')) {
    platform = 'windows';
  } else if (userAgent.includes('linux')) {
    platform = 'linux';
  } else if (
    userAgent.includes('iphone') ||
    userAgent.includes('ipad') ||
    userAgent.includes('ipod')
  ) {
    platform = 'ios';
  } else if (userAgent.includes('android')) {
    platform = 'android';
  }

  // Detect device type
  const isMobileUA =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    );
  const hasTouch = 'ontouchstart' in window;
  const isSmallScreen = window.innerWidth < 768;

  let deviceType: DeviceType = 'desktop';
  let isMobile = false;

  if (isMobileUA || (hasTouch && isSmallScreen)) {
    if (
      userAgent.includes('ipad') ||
      (userAgent.includes('android') && !userAgent.includes('mobile'))
    ) {
      deviceType = 'tablet';
    } else {
      deviceType = 'mobile';
    }
    isMobile = true;
  }

  // Determine bookmark shortcut
  const bookmarkShortcut = platform === 'macos' ? 'Cmd+D' : 'Ctrl+D';

  return {
    platform,
    deviceType,
    isMobile,
    isDesktop: !isMobile,
    bookmarkShortcut,
    userAgent: navigator.userAgent,
  };
}

// [ANCHOR: convenience-functions]
/**
 * Check if current device is desktop
 */
export function isDesktopDevice(): boolean {
  return detectPlatform().isDesktop;
}

/**
 * Check if current device is mobile
 */
export function isMobileDevice(): boolean {
  return detectPlatform().isMobile;
}

/**
 * Get the appropriate bookmark keyboard shortcut for the current platform
 */
export function getBookmarkShortcut(): string {
  return detectPlatform().bookmarkShortcut;
}

/**
 * Get the current platform type
 */
export function getPlatformType(): PlatformType {
  return detectPlatform().platform;
}

/**
 * Check if current platform is macOS
 */
export function isMacOS(): boolean {
  return detectPlatform().platform === 'macos';
}

/**
 * Check if current platform is Windows
 */
export function isWindows(): boolean {
  return detectPlatform().platform === 'windows';
}

// [ANCHOR: browser-capabilities]
/**
 * Check if Web Share API is supported
 */
export function supportsWebShare(): boolean {
  return typeof window !== 'undefined' && 'share' in navigator;
}

/**
 * Check if Fullscreen API is supported
 */
export function supportsFullscreen(): boolean {
  if (typeof document === 'undefined') return false;

  return !!(
    document.fullscreenEnabled ||
    (document as any).webkitFullscreenEnabled ||
    (document as any).mozFullScreenEnabled ||
    (document as any).msFullscreenEnabled
  );
}

/**
 * Check if Clipboard API is supported
 */
export function supportsClipboard(): boolean {
  return typeof navigator !== 'undefined' && 'clipboard' in navigator;
}

// [ANCHOR: debug-utilities]
/**
 * Get detailed platform information for debugging
 */
export function getPlatformDebugInfo(): PlatformInfo & {
  screenWidth: number;
  screenHeight: number;
  supportsWebShare: boolean;
  supportsFullscreen: boolean;
  supportsClipboard: boolean;
} {
  const platformInfo = detectPlatform();

  return {
    ...platformInfo,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    supportsWebShare: supportsWebShare(),
    supportsFullscreen: supportsFullscreen(),
    supportsClipboard: supportsClipboard(),
  };
}
