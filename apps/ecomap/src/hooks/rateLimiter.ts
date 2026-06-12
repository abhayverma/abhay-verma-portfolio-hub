class RateLimiter {
  private lastRequestTime: number = 0;
  private readonly cooldownMs: number;

  constructor(cooldownMs: number = 1000) {
    this.cooldownMs = cooldownMs; // 1 second default for Nominatim compliance
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    if (now - this.lastRequestTime >= this.cooldownMs) {
      this.lastRequestTime = now;
      return true;
    }
    return false;
  }
}

// Export singleton instances for specific APIs
export const nominatimLimiter = new RateLimiter(1500); // 1.5s cooldown for OpenStreetMap
export const inatLimiter = new RateLimiter(2000); // 2s cooldown for iNaturalist