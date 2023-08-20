import React, { useState, useEffect } from 'react';










const InfoBox = ({ text, title }) => {
  return (
    <div className="p-2 shadow-md bg-zinc-300 border border-gray-400 rounded-md mt-2">
      <div className="text-md">{title}</div>
      <div className="font-bold font-mono overflow-x-auto bg-zinc-200 p-2 rounded-md">{text}</div>


 </div>
  );
};



function App() {
  const [data, setData] = useState({});
  const [inputUrl, setInputUrl] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      if (inputUrl) {
        try {
          const response = await fetch(`api/info?url=${encodeURIComponent(inputUrl)}`);
          if (response.ok) {
            const jsonData = await response.json();
            setData(jsonData);
          } else {
            console.error('Error fetching data:', response.status);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchData();
  }, [inputUrl]);


  const info = data.video_info || {};


console.log(info);

  return (
    <div className="dark:bg-zinc-700 h-screen">

    <div className="p-2">
      <input
        className="p-2 w-full h-8 bg-zinc-300 rounded-md"
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Enter URL"
      />
      </div>

        <InfoBox text={info.title} title="Video Title"/>
        <InfoBox text={info.author} title="Video Author"/>
        <InfoBox text={info.views} title="Video Views"/>
<InfoBox text={info.duration} title="Video Duration"/>
        <InfoBox text={info.description} title="Video Description"/>






{info.keywords && info.keywords.length > 0 && (
  <InfoBox
    text={info.keywords.map((keyword, index) => (
      <div key={index} className="p-2 border-2 border-blue-400 rounded-md mt-2">
        {keyword}
      </div>
    ))}
    title="Keywords"
  />
)}




    


   </div>
  );
}

export default App;

