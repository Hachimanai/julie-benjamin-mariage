import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const files = ['index.html', 'repas.html'];

describe('Program Times', () => {
    files.forEach(file => {
        it(`should have all program times set to --h-- in ${file}`, () => {
            const html = fs.readFileSync(path.resolve(__dirname, `../${file}`), 'utf8');
            const dom = new JSDOM(html);
            const document = dom.window.document;
            const timeElements = document.querySelectorAll('.program-section .time');
            
            expect(timeElements.length).toBeGreaterThan(0);
            
            timeElements.forEach(el => {
                expect(el.textContent.trim().toLowerCase()).toBe('--h--');
            });
        });
    });
});
