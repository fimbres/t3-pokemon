import React, { FC } from 'react'
import Image from 'next/image';

import SpinnerImage from '../assets/images/spinner.png';

const Loading: FC = () => (
    <Image src={SpinnerImage} className='animate-spin' width={80} height={80} alt='Loading Spinner'/>
);

export default Loading;
