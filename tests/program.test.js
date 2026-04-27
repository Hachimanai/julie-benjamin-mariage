import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('Program Times', () => {
    let dom;
    let document;

    beforeEach(() => {
        dom = new JSDOM(html);
        document = dom.window.document;
    });

    it('should have all program times set to --h--', () => {
        const timeElements = document.querySelectorAll('.program-section .time');
        expect(timeElements.length).toBeGreaterThan(0);
        
        timeElements.forEach(el => {
            expect(el.textContent.trim()).toBe('--h--');
        });
    });
});
