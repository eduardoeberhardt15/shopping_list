import * as Updates from 'expo-updates';

const checkUpdate = async () => {

    try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
        alert("Nova atualização detectada, ela será baixada e atualizada automaticamente");
        setTimeout(async()=>{
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
        },2000);
        
    }
    } catch (e) {
    // handle or log error
    }

}

export default checkUpdate;