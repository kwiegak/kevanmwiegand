declare module '*.css';
declare module '*.png';
declare module "*.svg" {
    const content: any;
    export default content;
}