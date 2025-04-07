"use client";

import React from 'react';
import { ParamProps } from '@/types/appNode';

function BrowserInstanceParam({param}:ParamProps) {
  return (
    <div><p className='text-xs'>{param.name}</p></div>
  )
}

export default BrowserInstanceParam