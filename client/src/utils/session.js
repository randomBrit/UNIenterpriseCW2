export function getOrCreateSessionId() {
    const key = "session_id";
    let sessionId = localStorage.getItem(key);
  
    if (!sessionId) {
      sessionId = `guest_${crypto.randomUUID?.() || Date.now()}`;
      localStorage.setItem(key, sessionId);
    }
  
    return sessionId;
  }
  
  export function getUserOrSessionId(user) {
    return user?.id || getOrCreateSessionId();
  }