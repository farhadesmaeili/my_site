import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';


export const applyCommonMiddleware = (app: Application): void => {
    app.use(cors());  // فعال کردن CORS
    app.use(bodyParser.json());  // پارس کردن JSON در درخواست‌ها
    app.use(morgan('combined'));  // ثبت لاگ‌های درخواست‌ها با فرمت 'combined'
    // سایر middlewareها مانند لاگ‌گیری یا احراز هویت را می‌توان اضافه کرد
};
