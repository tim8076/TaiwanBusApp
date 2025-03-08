export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// 傳入公車到站時間和站牌狀態
export const showBusStatus = (time, status) => {
  switch (status) {
    case 1:
      return { text: '尚未發車', class: '' };
    case 2:
      return { text: '交管不停靠', class: '' };
    case 3:
      return { text: '末班車已過', class: '' };
    case 4: 
      return { text: '今日未營運', class: '' };
    case 0:
      if (time < 30) {
        return { text: '進站中', class: 'active' } 
      } else if (time < 60) {
        return { text: '即將到站', class: 'active'}
      } else {
        return { text: `${Math.round(time  / 60)} 分`, class: 'upComing' }
      }
    default:
      return { text: '尚未發車', class: '' };
  }
}