"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/lib/database.types";

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  endpoint: {
    id: string;
    name: string;
    description: string | null;
    form_json?: Json | null;
    theme_id?: string | null;
    path?: string;
    branding_logo?: string | null;
    branding_cover?: string | null;
    redirect_url?: string | null;
    jsonpost_branding?: boolean | null;
  } | null;
  themes: Array<{ id: string; name: string; description: string; colors: string[] }>;
  selectedTheme: string;
}

export function EmbedModal({
  isOpen,
  onClose,
  endpoint,
  themes,
  selectedTheme: initialTheme,
}: EmbedModalProps) {
  const { toast } = useToast();
  const [embedType, setEmbedType] = useState<"modal" | "chatbox" | "drawer" | "button">("modal");
  const [selectedTheme, setSelectedTheme] = useState(initialTheme || "default");
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");

  const generateEmbedCode = () => {
    if (!endpoint?.id) return '';

    const sdkScript = `<script src="https://forms.jsonpost.com/embed/v1/embed.js"></script>`;
    
    if (embedType === 'modal') {
      return `${sdkScript}
<script>
  const modal = FormEmbed.createModal('${endpoint.id}', {
    theme: '${selectedTheme}',
    width: ${width},
    height: ${height}
  });
  
  // Call modal.open() when you want to show the form
  modal.open();
</script>`;
    }

    if (embedType === 'chatbox') {
      return `${sdkScript}
<script>
  FormEmbed.createChatbox('${endpoint.id}', {
    theme: '${selectedTheme}',
    position: 'bottom-right',
    buttonColor: '#3a7685',
    width: ${width},
    height: ${height}
  });
</script>`;
    }

    if (embedType === 'drawer') {
      return `${sdkScript}
<script>
  FormEmbed.createDrawer('${endpoint.id}', {
    theme: '${selectedTheme}',
    side: 'right',
    width: ${width},
    buttonText: 'Open Form',
    buttonColor: '#3a7685'
  });
</script>`;
    }

    if (embedType === 'button') {
      return `<button id="my-form-button">Open Form</button>

${sdkScript}
<script>
  FormEmbed.createButton('${endpoint.id}', {
    theme: '${selectedTheme}',
    buttonSelector: '#my-form-button',
    openAs: 'modal',
    width: ${width},
    height: ${height}
  });
</script>`;
    }

    return '';
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Embed code has been copied to your clipboard.",
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy the code manually.",
        variant: "destructive",
      });
    }
  };

  const embedCode = generateEmbedCode();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Code className="h-5 w-5 mr-2" />
            Embed Form
          </DialogTitle>
          <DialogDescription>
            Generate embed code to integrate your form into any website. Choose from different embed types and customize the appearance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Embed Type Selection with Tabs */}
          <Tabs value={embedType} onValueChange={(value) => setEmbedType(value as "modal" | "chatbox" | "drawer" | "button")}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="modal">Modal</TabsTrigger>
              <TabsTrigger value="chatbox">Chatbox</TabsTrigger>
              <TabsTrigger value="drawer">Drawer</TabsTrigger>
              <TabsTrigger value="button">Button</TabsTrigger>
            </TabsList>
            
            <TabsContent value="modal" className="mt-4">
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="font-medium">Modal Popup</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Opens your form in a modal overlay using the FormEmbed SDK. Perfect for capturing attention without leaving the page.
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chatbox" className="mt-4">
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="font-medium">Floating Chatbox</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Adds a floating chat icon that opens your form in a popover. Great for support forms and feedback collection.
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="drawer" className="mt-4">
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="font-medium">Side Drawer</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Slides in from the side of the screen. Ideal for detailed forms that need more space.
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="button" className="mt-4">
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="font-medium">Button Trigger</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Attach the form to any existing button on your website. The form opens as a modal when clicked.
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Configuration Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="800"
              />
            </div>
            
            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="600"
              />
            </div>
          </div>

          {/* Embed Code */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <Label className="text-sm font-medium">Embed Code</Label>
            </div>
            
            <div className="relative">
              <Textarea
                value={embedCode}
                readOnly
                className="font-mono text-sm min-h-[200px] bg-gray-50 dark:bg-gray-800"
              />
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(embedCode)}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Badge variant="secondary">
                {embedType === "modal" ? "Modal" :
                 embedType === "chatbox" ? "Chatbox" :
                 embedType === "drawer" ? "Drawer" :
                 embedType === "button" ? "Button" : embedType}
              </Badge>
              <span>•</span>
              <span>Theme: {selectedTheme}</span>
              <span>•</span>
              <span>{width} × {height}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => copyToClipboard(embedCode)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Embed Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}