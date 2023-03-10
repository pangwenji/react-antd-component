// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import MessageOutlinedSvg from '@ant-design/icons-svg/lib/asn/MessageOutlined';
import StudyIcon, { AntdIconProps } from '../components/StudyIcon';

const MessageOutlined = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <StudyIcon {...props} ref={ref} icon={MessageOutlinedSvg} />;

MessageOutlined.displayName = 'MessageOutlined';
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(MessageOutlined);