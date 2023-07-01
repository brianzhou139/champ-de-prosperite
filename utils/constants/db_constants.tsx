import { WEATHERUPDATE } from '@models/db_model';
import { isDEVELOPMENT } from '@utils/constants/init_constants';
import { Type } from 'typescript';

// db users
export const REALTIME_DATABASE_DB_USERS_PATH = "dbusers/";


// realtime db constants
export const REALTIME_DB_WEATHER_NEWS = isDEVELOPMENT ? "dev-weather_news/":"prod-weather_news/";

// announcements
export const REALTIME_DB_ANNOUNCEMENTS = isDEVELOPMENT ? "dev-announcements/":"prod-announcements/";

// Market Guide 
export const REALTIME_DB_MARKET_GUIDE = isDEVELOPMENT ? "dev-market_guide/":"prod-market_guide/";

// Farmers
export const REALTIME_DB_FARMERS = isDEVELOPMENT ? "dev-farmers/":"prod-farmers/";

// Admins
export const REALTIME_DB_ADMINS = isDEVELOPMENT ? "dev-admins/":"prod-admins/";


// product storage
export const FB_STORAGE_PRODUCT__IMAGE = isDEVELOPMENT ? "dev-product_images/":"prod-product_images/";


// Maximum Image Size allowed
export const STORAGE_IMAGE_MAXIMUM_SIZE = 20;

// allowed images extensions and size
export const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.gif', '.png','.jpeg','.webp','bmp','tiff','raw','tif'];


export const get_REAL_TIME_DB_BASE=(pathname:string)=>{
    if(pathname==="/"){
        return REALTIME_DB_WEATHER_NEWS;
    }  
    if(pathname==="/dashboard/announcements"){
        return REALTIME_DB_ANNOUNCEMENTS;
    }
    if(pathname==="/dashboard/market-guide"){
        return REALTIME_DB_MARKET_GUIDE;
    }
    if(pathname==="/dashboard/farmers"){
        return REALTIME_DB_FARMERS;
    }

    if(pathname==="/dashboard/admins"){
        return REALTIME_DB_ADMINS;
    }

    //alert("get_REAL_TIME_DB_BASE failed check check");

    return "";
}
