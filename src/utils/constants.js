

import backgroundThemePlaceholder from '../assets/images/background-theme-placeholder.webp'
import basicThemePlaceholder from '../assets/images/basic-theme-placeholder.webp'
import modernThemePlaceholder from '../assets/images/modern-theme-placeholder.webp'
import stylishThemePlaceholder from '../assets/images/stylish-theme-placeholder.webp'
import outlineThemePlaceholder from '../assets/images/outline-theme-placeholder.webp'
import previewThemePlaceholder from '../assets/images/preview-theme-placeholder.webp'
import mobileThemePlaceholder from '../assets/images/mobile-theme-placeholder.webp'


export const THEMES = [
    {
        label: 'background',
        preview: backgroundThemePlaceholder
    },
    {
        label: 'stylish',
        preview: stylishThemePlaceholder
    },
    {
        label: 'basic',
        preview: basicThemePlaceholder
    },
    {
        label: 'modern',
        preview: modernThemePlaceholder
    },
    {
        label: 'outline',
        preview: outlineThemePlaceholder
    },
    {
        label: 'preview',
        preview: previewThemePlaceholder
    },
    {
        label: 'mobile',
        preview: mobileThemePlaceholder
    },
]

export const PLATFORMS = [
    { name: 'hashnode', label: 'Hashnode', width: 1600, height: 840 },
    { name: 'dev', label: 'Dev.to', width: 1000, height: 420 },
    { name: 'linkedin-post', label: 'LinkedIn Post', width: 1200, height: 627 },
    { name: 'linkedin-article', label: 'LinkedIn Article', width: 1280, height: 720 },
    { name: 'twitter', label: 'Twitter/X', width: 1200, height: 675 },
    { name: 'facebook', label: 'Facebook', width: 1200, height: 630 },
    { name: 'medium', label: 'Medium', width: 1500, height: 750 },
    { name: 'wordpress', label: 'WordPress', width: 1200, height: 628 },
    { name: 'tumblr', label: 'Tumblr', width: 1280, height: 720 },
    { name: 'youtube', label: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'instagram', label: 'Instagram', width: 1080, height: 1080 },
    { name: 'pinterest', label: 'Pinterest', width: 1000, height: 1500 },
    { name: 'custom', label: 'Custom', width: 1200, height: 630 },
]