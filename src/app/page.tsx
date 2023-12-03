'use client';
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Index() {

  const [dob, setDob] = useState({
    year: '',
    month: '',
    day: ''
  });
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const [dobErrors, setDobErrors] = useState({
    day: '',
    month: '',
    year: ''
  });
  const [error, setError] = useState('');

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };


  const isDateValid = () => {
    const { day, month, year } = dob;
    const isValid = /^\d{1,2}$/.test(day) && /^\d{1,2}$/.test(month) && /^\d{4}$/.test(year);
    
    return isValid;
  };

  


  const validateDay = () => {
    const { day, month, year } = dob;
    const dayAsInt = Number(day);
    const monthAsInt = Number(month);
    const yearAsInt = Number(year);

    if (!dayAsInt || dayAsInt < 1 || dayAsInt > 31) {
      setDobErrors({ ...dobErrors, day: 'Invalid day' });
      return false;
    }

    if (([4, 6, 9, 11].includes(monthAsInt) && dayAsInt > 30) || (monthAsInt === 2 && dayAsInt > (isLeapYear(yearAsInt) ? 29 : 28))) {
      setDobErrors({ ...dobErrors, day: 'Invalid day for selected month' });
      return false;
    }

    if (monthAsInt === 2 && dayAsInt > (isLeapYear(yearAsInt) ? 29 : 28)) {
      setDobErrors({ ...dobErrors, day: `Selected month has ${isLeapYear(yearAsInt) ? 29 : 28} days.` });
      return false;
    }

    setDobErrors({ ...dobErrors, day: '' });
    return true;
  };

  const validateMonth = () => {
    const { day, month } = dob;
    const dayAsInt = Number(day);
    const monthAsInt = Number(month);

    if (!monthAsInt || isNaN(monthAsInt) || monthAsInt < 1 || monthAsInt > 12) {
      setDobErrors({ ...dobErrors, month: 'Invalid month' });
      return false;
    }

    if (([4, 6, 9, 11].includes(monthAsInt) && dayAsInt > 30) || (monthAsInt === 2 && dayAsInt > 29)) {
      setDobErrors({ ...dobErrors, month: 'Invalid day for selected month' });
      return false;
    }

    setDobErrors({ ...dobErrors, month: '' });
    return true;
  };

  const validateLeapYear = () => {
    const { day, month, year } = dob;
    const dayAsInt = Number(day);
    const monthAsInt = Number(month);
    const yearAsInt = Number(year);
    console.log('leap', isLeapYear(yearAsInt));
    if (monthAsInt === 2 && dayAsInt === 29 && !isLeapYear(yearAsInt)) {
      setDobErrors({ ...dobErrors, day: 'Invalid day for a non-leap year' });
      return false;
    }

    return true;
  };

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    if (isDateValid() && validateDay() && validateMonth() && validateLeapYear()) {
      let ageInMilliseconds: number;
      const birthDateObj = new Date(Number(dob.year), Number(dob.month) - 1, Number(dob.day));
      const currentDateObj = new Date();
      ageInMilliseconds = currentDateObj.getTime() - birthDateObj.getTime();
 
      const ageDate = new Date(ageInMilliseconds);
      const years = Math.abs(ageDate.getUTCFullYear() - 1970);
      const months = ageDate.getUTCMonth();
      const days = ageDate.getUTCDate() - 1;
      setAge({ years, months, days });

         if (birthDateObj > currentDateObj) {
      alert('The selected date is in the future.');
      return;
    }
    }
 
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="content max-w-3xl m-auto" role="main">
        <div className=" mx-3 sm:mx-0 rounded rounded-br-[60px] overflow-hidden shadow-lg">
          <div className="p-8 bg-white">
            <form className=" rounded" onSubmit={handleClick}>
              <div className="flex gap-4">
                <div>
                  <label className="block uppercase tracking-wide text-gray text-xs font-semibold mb-2"  htmlFor="day">Day:</label>
                  <input
                    className="appearance-none block w-full  text-black border border-primary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text"
                    value={dob.day} onChange={(e) => {
                      const dayInput = String(e.target.value);
                        setDob({ ...dob, day:dayInput});
                      
                    }} id="day"
                    placeholder="DD" onBlur={validateDay}/>
                  
                  {dobErrors.day && <p className="text-red-700 text-xs">{dobErrors.day}</p>}
                </div>
                <div>
                  <label className="block uppercase tracking-wide text-gray text-xs font-semibold mb-2" htmlFor="month">Month:</label>
                  <input
                    className="appearance-none block w-full  text-black border border-primary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    value={dob.month} onChange={(e) => {
                      const monthInput = String(e.target.value);
                      setDob({ ...dob, month: monthInput });

                    }} id="month"
                    placeholder="DD" onBlur={validateMonth} />
                  {dobErrors.month && <p className="text-red-700 text-xs">{dobErrors.month}</p>}
                </div>
                <div>
                  <label className="block uppercase tracking-wide text-gray text-xs font-semibold mb-2" htmlFor="year">Year:</label>
                  <input
                    className="appearance-none block w-full  text-black border border-primary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    value={dob.year} onChange={(e) => {
                      const yearInput = String(e.target.value);
                      setDob({ ...dob, year: yearInput });

                    }} id="year"
                    placeholder="DD" />
                </div>
                </div>
           

            <div className=" mt-2 relative h-32">
              <div className="h-px bg-gray-200 border-0 dark:bg-gray-700 absolute top-[40%] w-full "></div>
              <div className="flex sm:justify-end justify-center relative z-10">
                  <button type='submit' value="add" disabled={!isDateValid()} className={!isDateValid() ? 'cursor-not-allowed pointer-events-none' : ''}>
                <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              
                  <path fillRule="evenodd" clipRule="evenodd"
                d="M1.46449 59.4727C-5.01549 34.5937 10.6356 8.3517 36.0266 1.5237C52.5095 -2.9093 70.6646 2.50671 82.7976 15.4767C89.2335 22.3567 92.0575 27.4617 94.3715 36.4027C100.835 61.3682 85.4536 87.2001 60.1047 94.2151C56.2121 95.2341 52.1266 95.7766 47.9145 95.7766C43.5741 95.7766 39.3679 95.2005 35.3689 94.1205C27.0626 91.7799 19.3257 87.1391 13.1335 80.4917C6.73549 73.6247 3.74947 68.2447 1.46449 59.4727ZM46.9145 57.8897V41.9167C46.9145 31.9337 47.2895 25.9427 47.9145 25.9427C48.5385 25.9427 48.9265 32.0467 48.9465 42.1927L48.9775 58.4427L51.0835 55.6187C52.2415 54.0647 54.9335 51.6927 57.0655 50.3477C61.2055 47.7337 69.9145 45.9347 69.9145 47.6937C69.9145 48.2557 67.9225 49.0147 65.4875 49.3797C57.1455 50.6307 50.6025 57.1737 49.3515 65.5157C48.9865 67.9507 48.3395 69.9427 47.9145 69.9427C47.4895 69.9427 46.8425 67.9507 46.4775 65.5157C45.2265 57.1737 38.6835 50.6307 30.3415 49.3797C25.8305 48.7027 24.1745 46.9427 28.0485 46.9427C32.8385 46.9427 38.5955 49.5827 42.6645 53.6467L46.9145 57.8897Z"
                        fill="#151515" className={`hover:fill-primary transition ease-in-out duration-[300ms] ${!isDateValid() ? 'fill-gray-500' : ''}`} />
            </svg>
                    </button>
          </div>
        </div>
            </form> 

            <div className="text-5xl sm:text-6xl font-extrabold italic">
              <p><span className="text-primary">{age?.years || '--' }</span> years</p>
              <p><span className="text-primary" >{age?.months || '--'}</span> months</p>
              <p><span className="text-primary">{age?.days || '--'}</span> days</p>
      </div>

          </div>
          </div>
      </div>

      <div>
      </div>


    </main>
  )
}
