import { BrowserFrame, IPhoneFrame } from '../../assets/svg/mockups/DeviceFrames';
import '../../assets/svg/mockups/DeviceFrames.css';

/**
 * DeviceMockup — wrapper that picks Browser or iPhone frame based on `type` prop
 */
export default function DeviceMockup({ type = 'browser', url, children, className = '' }) {
  if (type === 'iphone') {
    return <IPhoneFrame className={className}>{children}</IPhoneFrame>;
  }
  return <BrowserFrame url={url} className={className}>{children}</BrowserFrame>;
}
