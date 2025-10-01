import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { input } = await req.json();
    
    if (!input) {
      return new Response(
        JSON.stringify({ error: 'Input text is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Processing input:', input);

    // Simple message enhancement logic
    const enhancements = [
      "✨ Enhanced: ",
      "🚀 Powered up: ",
      "🎯 Optimized: ",
      "💡 Improved: ",
      "🔥 Boosted: "
    ];

    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    const processedMessage = `${randomEnhancement}${input.charAt(0).toUpperCase() + input.slice(1)}`;

    const response = {
      message: processedMessage,
      originalInput: input,
      timestamp: new Date().toISOString(),
      processed: true
    };

    console.log('Generated response:', response);

    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in generate-message function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});