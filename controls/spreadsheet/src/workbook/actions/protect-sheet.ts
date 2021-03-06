import { Workbook, SheetModel } from '../base/index';
import { ProtectSettings, applyLockCells, UnprotectArgs } from '../common/index';
import { protectsheetHandler, protectSheetWorkBook, updateToggle, setLockCells } from '../common/index';
import { unprotectsheetHandler } from '../common/index';
import { getRangeIndexes,  getSwapRange } from '../common/index';
/**
 * The `WorkbookSpreadSheet` module is used to handle the Protecting functionalities in Workbook.
 */
export class WorkbookProtectSheet {
    private parent: Workbook;

    /**
     * Constructor for edit module in Workbook.
     * @private
     */
    constructor(workbook: Workbook) {
        this.parent = workbook;
        this.addEventListener();
    }
    private protectsheetHandler(args: ProtectSettings): void {
        let sheet: SheetModel = this.parent.getActiveSheet();
        sheet.protectSettings.selectCells = args.selectCells;
        sheet.protectSettings.formatCells = args.formatCells;
        sheet.protectSettings.formatColumns = args.formatColumns;
        sheet.protectSettings.formatRows = args.formatRows;
        sheet.protectSettings.insertLink = args.insertLink;
        this.parent.notify(protectSheetWorkBook, sheet.protectSettings);
        this.parent.notify(updateToggle, { props: 'Protect' });
    }

    private unprotectsheetHandler(args: UnprotectArgs): void {
        let sheet: SheetModel = this.parent.getActiveSheet();
        if (args.sheet) {
          sheet = this.parent.sheets[args.sheet];
        }
        sheet.protectSettings.formatCells = sheet.protectSettings.formatColumns = false;
        sheet.protectSettings.formatRows = sheet.protectSettings.selectCells = false;
        sheet.isProtected = false;
        this.parent.notify(protectSheetWorkBook, sheet.protectSettings);
        this.parent.notify(updateToggle, { props: 'Protect' });
    }

    /**
     * To destroy the edit module. 
     * @return {void}
     * @hidden
     */
    public destroy(): void {
        this.removeEventListener();
        this.parent = null;
    }

    private addEventListener(): void {
        this.parent.on(protectsheetHandler, this.protectsheetHandler, this);
        this.parent.on(unprotectsheetHandler, this.unprotectsheetHandler, this);
        this.parent.on(setLockCells, this.lockCells, this);
    }

    private removeEventListener(): void {
        if (!this.parent.isDestroyed) {
            this.parent.off(protectsheetHandler, this.protectsheetHandler);
            this.parent.off(setLockCells, this.lockCells);
            this.parent.off(protectsheetHandler, this.unprotectsheetHandler);

        }
    }

    private lockCells(args?: {range: string | number[], isLocked?: boolean}): void {
        let sheet: SheetModel = this.parent.getActiveSheet();
        let range: string | number[];
        if (args) {
           range = args.range;
        } else {range = sheet.selectedRange; }
        let indexes: number[] = typeof (range) === 'object' ? <number[]>range :
            getSwapRange(getRangeIndexes(<string>range));
        for (let i: number = indexes[0]; i <= indexes[2]; i++) {
            for (let j: number = indexes[1]; j <= indexes[3]; j++) {
                if (this.parent.getActiveSheet().id === sheet.id) {
                    this.parent.notify(applyLockCells, {  rowIdx: i, colIdx: j, isLocked: args.isLocked
                    });
                }
            }
        }
    }
    /**
     * Get the module name.
     * @returns string
     * @private
     */
    public getModuleName(): string {
        return 'workbookProtectSheet';
    }
}