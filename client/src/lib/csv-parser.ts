import Papa from 'papaparse';

export interface CSVParseResult {
  data: any[];
  errors: Papa.ParseError[];
  meta: Papa.ParseMeta;
}

export const parseCSV = (file: File): Promise<CSVParseResult> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const validateCSVStructure = (data: any[], expectedColumns: string[]): { isValid: boolean; missingColumns: string[]; foundColumns: string[] } => {
  if (!data || data.length === 0) {
    return {
      isValid: false,
      missingColumns: expectedColumns,
      foundColumns: []
    };
  }

  const foundColumns = Object.keys(data[0] || {});
  const missingColumns = expectedColumns.filter(col => !foundColumns.includes(col));

  return {
    isValid: missingColumns.length === 0,
    missingColumns,
    foundColumns
  };
};

export const prepareSoilData = (csvData: any[], uploadId: string) => {
  return csvData.map(row => ({
    x: Number(row.x),
    y: Number(row.y), 
    voltage: Number(row.voltage),
    pollutant: String(row.pollutant),
    uploadId
  }));
};
