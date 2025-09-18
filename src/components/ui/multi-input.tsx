"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";

interface MultiInputProps {
  label: string;
  placeholder: string;
  values: string[];
  onChange: (values: string[]) => void;
  type?: "email" | "url" | "text";
  description?: string;
  maxItems?: number;
}

export function MultiInput({
  label,
  placeholder,
  values,
  onChange,
  type = "text",
  description,
  maxItems = 10,
}: MultiInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    if (inputValue.trim() && !values.includes(inputValue.trim()) && values.length < maxItems) {
      onChange([...values, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeItem = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  const validateInput = (value: string): boolean => {
    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
    if (type === "url") {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }
    return value.trim().length > 0;
  };

  const isValidInput = inputValue.trim() ? validateInput(inputValue.trim()) : true;

  return (
    <div className="space-y-3">
      <div>
        <Label>{label}</Label>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      
      {/* Display existing items */}
      {values.length > 0 && (
        <div className="space-y-2">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border"
            >
              <span className="flex-1 text-sm">{value}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
                className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add new item input */}
      {values.length < maxItems && (
        <div className="flex gap-2">
          <Input
            type={type}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className={!isValidInput ? "border-red-300 focus:border-red-500" : ""}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addItem}
            disabled={!inputValue.trim() || !isValidInput || values.includes(inputValue.trim())}
            className="px-3"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!isValidInput && inputValue.trim() && (
        <p className="text-xs text-red-600">
          {type === "email" 
            ? "Please enter a valid email address" 
            : type === "url" 
            ? "Please enter a valid URL" 
            : "Please enter a valid value"}
        </p>
      )}

      {values.length >= maxItems && (
        <p className="text-xs text-gray-500">
          Maximum of {maxItems} items allowed
        </p>
      )}
    </div>
  );
}