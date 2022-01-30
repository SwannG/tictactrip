const infinite: number = 10000000000;
const lineLimit: number = 80;
let dp: number[] = [];
let lastWordsLineIndexes: number[] = [];

const justifyText = ( text: string ): string => {
    let result: string = '';
    const texts: string[] = text.split( /\n{2,}/ );

    for ( let i = 0; i < texts.length; ++i ) {
        const textWithoutLineReturn: string[] = texts[ i ].replace( /\s+/g, ' ' ).trim().split( ' ' );

        init( textWithoutLineReturn );
        getDP( textWithoutLineReturn, 0 );
        result += i !== texts.length - 1 ? justify( textWithoutLineReturn ) + '\n' : justify( textWithoutLineReturn );
    }

    return result;
};

const init = ( text: string[] ) => { 
    dp = [];
    lastWordsLineIndexes = [];
    for ( let i = 0; i < text.length; ++i ) {
        dp[ i ] = -1;
    }
};

const costFunction = ( text: string[], i: number, j: number ) => {
    let length: number = -1;

    while ( i <= j ) {
        length += text[ i ].length + 1;
        ++i;
    }

    if ( length > lineLimit ) {
        return infinite;
    }

    if ( j === text.length - 1 ) {
        return 0;
    }

    return Math.pow( lineLimit - length, 3 );
};

const getDP = ( text: string[], i: number ) => {
    if ( i >= dp.length ) {
        return 0;
    }

    if ( dp[ i ] !== -1 ) {
        return dp[ i ];
    }

    let minValue: number = infinite;
    let cost: number = 0;
    let indexLastWordLine: number = 0;

    for ( let j = i; j < dp.length && cost < infinite; ++j ) {
        cost = costFunction( text, i, j ) + getDP( text,j + 1 );
        if ( cost < minValue ) {
            minValue = cost;
            indexLastWordLine = j;
        }
    }
    dp[ i ] = minValue;
    lastWordsLineIndexes[ i ] = indexLastWordLine;
    return minValue;
};

const getWordsChars = ( text: string[], i: number, j: number ): number =>   {
    let nbChar: number = 0;

    while ( i <= j ) {
        nbChar = nbChar + text[ i ].length;
        ++i;
    }
    return nbChar;
};

const justify = ( text: string[] ): string => {
    const line: string[] = [];

    for ( let i = 0, j = lastWordsLineIndexes[ 0 ]; i < lastWordsLineIndexes.length; ++i ) {
        const nbZones = j - i;
        const nbSpaces = lineLimit - getWordsChars( text, i, j );

        if ( j === lastWordsLineIndexes.length - 1 ) {
            while ( i <= j ) {
                line[ i ] = line[ i ] !== undefined ? line[ i ] + `${text[ i ]}` : `${text[ i ]}`;
                if ( i !== j ) {
                    line[ i ] += ' ';
                }
                ++i;
            }
        }
        else {
            const spaces = Math.floor( nbSpaces / nbZones );
            const iValueBeforeLopping = i;

            for ( ; i < j; ++i ) {
                line[ i ] = line[ i ] !== undefined ? line[ i ] + `${text[ i ]}${' '.repeat( spaces )}` : `${text[ i ]}${' '.repeat( spaces )}`;
            }

            if ( nbSpaces % nbZones !== 0 ) {
                let remainedSpaces = nbSpaces % nbZones;
                for ( let i = iValueBeforeLopping; remainedSpaces > 0; ++i ) {
                    line[ i ] += ' ';
                    --remainedSpaces;

                    if ( i === line.length ) {
                        i = iValueBeforeLopping;
                    }
                }
            }
            line[ i ] = i + 1 !== lastWordsLineIndexes.length ? text[ i ] + '\n' : text[ i ];
        }
        j = lastWordsLineIndexes[ i + 1 ];
    }
    return line.join( '' );
};

export default justifyText;
