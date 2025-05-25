import React , {useEffect,useState} from 'react';

export default function Admin() {

    // useEffect(() => {
    //     window.location.href = "http://localhost:5000/admin";
    // } , []);

    const [src, setSrc] = useState(null);

    const dimension = {
        width: '100%',
        height: '45rem',
    }

    useEffect( async () => {
        const adminStatus = await fetch("/admin");
        const status = await adminStatus.status;
        if(status === 200){
            
            setSrc("http://localhost:5000/admin");
        }

    } , []);

    return (
        // <h1>Admin</h1>
        <div style={dimension} className="col-md-12">
            <div style={dimension} >
                { !src ? <h1>Loading...</h1> : <iframe  style={dimension} src={src}></iframe> }
            </div>
        </div>
    );
}