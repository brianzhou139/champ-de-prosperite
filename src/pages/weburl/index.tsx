
import dynamic from 'next/dynamic';
import React, { useEffect,useState } from "react";
import Layout from '@components/Containers/Layout';

function Zoulo(){
    const html = `
    <div id="main">
      <span class="prettify">
        keep me and make me pretty!
      </span>

      <h1>Brian Zhou Is Here</h1>
  
      <pre class="code-class">print("Hello World")</pre>
  
      <h5 class="senior">This is only a test <span>Murwere</span></h5>
    </div>
  `;

    const [formValues, setFormValues] = useState({  
        websiteUrl:'',
      });

      const [webContent,setWebContent]=useState('');
      const [title,setTitle]=useState('');
      const [image,setImage]=useState('');
      const [description,setDescription]=useState('');
    
    const handleChange = (e:any) => {
        const id = e.target.id;
        const newValue = e.target.value;
        setFormValues({ ...formValues, [id]: newValue });
    };

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        // setting the Topic 
        console.log("submit button Clicked");
        console.log(formValues);
        //sendNotificationToBackend();
        retrieveUrlDataFromBackend();

    } // end of handleSubmit

    const retrieveUrlDataFromBackend=async()=>{
        try {
            const res = await fetch('/api/parser',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(formValues),
                }
            );
            const data = await res.json();

            let title=data.title??'';
            let content=data.content??'';
            let description=data.description??'';
            let imgUrl=data.image??'';

            setWebContent(content);
            setTitle(title);
            setDescription(description);
            setImage(imgUrl);

            console.log("sendNotificationToBackend Results done");
            console.log(data);
            emptyFormValues();
        } catch (err) {
            console.log("sendNotificationToBackend Error");
            console.log(err);
            emptyFormValues();
        }
    }// end of sendNotificationToBackend

    const emptyFormValues=()=>{
        setFormValues({
            websiteUrl:'',
        });
    }

    return(
        <Layout>
            <div className='overflow-y-auto'>
            <form onSubmit={handleSubmit}>
                 <div>
                    <label className='mt-2 block' htmlFor="noticationTitle">Website Url</label>
                    <input
                        className='border border-slate-200'
                        id="websiteUrl"
                        type="text"
                        value={formValues.websiteUrl}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className='mt-2 block bg-cyan-500 p-2 rounded'  type="submit">retrieve data</button>
            </form>

            <div>
                <div className='mt-2'>title : {title}</div>
                <div className='mt-2'>description : {description}</div>
                <div className='mt-2'>image : {image}</div>
                <div className='mt-2'>html content below</div>
                <div className='mt-2'>{webContent}</div>
            </div>

            </div>

        </Layout>
    );
}

export default Zoulo;