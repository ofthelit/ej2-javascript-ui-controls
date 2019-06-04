import { Property, ChildProperty } from '@syncfusion/ej2-base';
import { ICustomOptr } from '@syncfusion/ej2-grids';
import { FilterHierarchyMode } from '../enum';


/**
 * Configures the filtering behavior of the TreeGrid.
 */
export class SearchSettings extends ChildProperty<SearchSettings> {
    /**
     * Specifies the columns to be searched at initial rendering of the TreeGrid. You can also get the columns that were currently filtered.
     * @default []
     */
    @Property()
    public fields: string[];
    /**
     * If ignoreCase set to true, then search ignores the diacritic characters or accents while filtering.
     *
     * > Check the [`Diacritics`](../filtering/#diacritics) filtering.
     * @default false
     */
    @Property(false)
    public ignoreCase: boolean;
    /**
     * The `operators` is used to override the default operators in filter menu. This should be defined by type wise
     * (string, number, date and boolean). Based on the column type, this customize operator list will render in filter menu.
     * @default null
     */
    @Property()
    public operators: ICustomOptr;
    /**
     * A key word for searching the TreeGrid content.
     */
    @Property()
    public key: string;
    /**
     * Defines the filter types. The available options are,
     * * `Parent`: Initiates filter operation after Enter key is pressed.
     * * `Child`: Initiates filter operation after a certain time interval. By default, time interval is 1500 ms.
     * @default Parent
     */
    @Property()
    public hierarchyMode: FilterHierarchyMode;
  }