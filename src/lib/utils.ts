import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extracts all variable paths from a JSON object
 * @param obj - The JSON object to extract paths from
 * @param prefix - The current path prefix (used for recursion)
 * @returns Array of dot-notation paths
 */
export function extractVariablePaths(obj: unknown, prefix: string = ""): string[] {
  const paths: string[] = [];
  
  if (obj === null || obj === undefined) {
    return paths;
  }
  
  if (typeof obj !== "object") {
    // If it's a primitive value, add the current path
    if (prefix) {
      paths.push(prefix);
    }
    return paths;
  }
  
  if (Array.isArray(obj)) {
    // Handle arrays - extract paths for each element with index
    obj.forEach((item, index) => {
      const arrayPath = prefix ? `${prefix}[${index}]` : `[${index}]`;
      const subPaths = extractVariablePaths(item, arrayPath);
      paths.push(...subPaths);
    });
  } else {
    // Handle objects - recursively extract paths for each property
    const objRecord = obj as Record<string, unknown>;
    Object.keys(objRecord).forEach((key) => {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      const subPaths = extractVariablePaths(objRecord[key], currentPath);
      paths.push(...subPaths);
    });
  }
  
  return paths;
}