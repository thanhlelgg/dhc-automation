import { Constants } from '../../common/constants';

const COLUMN_NAME = Constants.translator.tableColumnName.positionsList;

export class PositionsTableHeader {
    static readonly POSITION_NAME = new PositionsTableHeader(
        'POSITION_NAME',
        COLUMN_NAME.positionName,
        'position_name',
    );
    static readonly POSITION_ABBREVIATION = new PositionsTableHeader(
        'POSITION_ABBREVIATION',
        COLUMN_NAME.positionAbbreviation,
        'abbreviation',
    );
    static readonly TIME_CARD_APPROVE = new PositionsTableHeader(
        'TIME_CARD_APPROVE',
        COLUMN_NAME.timeCardApprove,
        'timecard_approve',
    );
    static readonly CREATED = new PositionsTableHeader('CREATED', COLUMN_NAME.created);
    static readonly MODIFIED = new PositionsTableHeader('MODIFIED', COLUMN_NAME.modified);
    static readonly ALLS = [
        PositionsTableHeader.POSITION_NAME,
        PositionsTableHeader.POSITION_ABBREVIATION,
        PositionsTableHeader.TIME_CARD_APPROVE,
        PositionsTableHeader.CREATED,
        PositionsTableHeader.MODIFIED,
    ];
    // private to disallow creating other instances of this type
    private constructor(
        private readonly name: string,
        public readonly uiColumnName: string,
        public readonly csvColumnName?: string,
    ) {}

    toString(): string {
        return this.name;
    }
}
