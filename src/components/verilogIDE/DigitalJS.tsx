import react from 'react';
import digitaljs from 'digitaljs';
import { useEffect, useState } from 'react';
import { process_sv, yosys2digitaljs } from '@/yosys2digitaljs/src';




export default function DigitalJS(value : Object) {
  const processed = process_sv(value.toString())
  console.log("procedeu: ", processed)
  return(
    <div>
      DIGITALJS
    </div>
  )
}
