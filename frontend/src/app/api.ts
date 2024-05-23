
export async function GETDATA(url: string, headers: any = {}): Promise<any> {
    const response = await fetch(url);
    const json = await response.json();
    return  {status:response.status, data:json.data}
}

export async function GETAUTHDATA(url: string, token:string): Promise<any> {
    try{
        const response = await fetch(url,
            {
                headers: {
                    'Content-Type': 'application/json', // Adjust the content type as needed
                    "Authorization": `Bearer ${token}`
                },
            });
        if(!response.ok)
            throw Error("Response Not OK , status : "+ response.status)
        const json = await response.json();
        return  {status:response.status, data:json.data}
    }catch(error){
        console.log(error)
    }
}

export async function POSTDATA(url: string, data:any = {}, headers: any = {}){
    const response = await fetch(url,
        {
            method:"POST",
            headers: {
                'Content-Type': 'application/json', // Adjust the content type as needed
                ...headers,
            },
            body: JSON.stringify(data),
        });
    const json = await response.json();
    return  {status:response.status, details:json.details,token:json.token,is_admin:json.is_admin}
}


export async function PATCHDATA(url: string, headers: any = {}): Promise<any> {
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(':)))Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Error fetching data: ' + error);
    }
}


export async function DELETEAUTHDATA(url: string, token:string, data:any = {}): Promise<any> {
    try{
        const response = await fetch(url,
            {
                method:"delete",
                headers: {
                    'Content-Type': 'application/json', // Adjust the content type as needed
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
        if(!response.ok)
            throw Error("Response Not OK , status : "+ response.status)
        const json = await response.json();
        return  {status:response.status, data:json.data}
    }catch(error){
        console.log(error)
    }
}
export async function PATCHAUTHDATA(url: string, token:string, data:any = {},): Promise<any> {
    try{
        const response = await fetch(url,
            {
                method:"PATCH",
                headers: {
                    'Content-Type': 'application/json', // Adjust the content type as needed
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

        if(!response.ok)
            throw Error("Response Not OK , status : "+ response.status)
        const json = await response.json();
        return  {status:response.status, data:json.data}
    }catch(error){
        console.log(error)
    }
}