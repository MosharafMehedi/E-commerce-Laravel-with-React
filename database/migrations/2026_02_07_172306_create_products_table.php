<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            
            // Category-r sathe Relationship (Foreign Key)
            $table->foreignId('category_id')
                  ->constrained()
                  ->onDelete('cascade'); // Category delete hole product-o delete hobe
            
            $table->string('name');
            $table->string('price'); // String rakha hoyeche jate "1,58,000" erom format save kora jay
            
            // Nullable and Default Fields
            $table->integer('quantity')->default(0); // Stock management
            $table->integer('rating')->nullable()->default(5); 
            $table->string('tag')->nullable(); // e.g., Hot, New, Trending
            $table->text('desc')->nullable(); // Description field
            $table->string('img')->nullable(); // Image path store korar jonno
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};