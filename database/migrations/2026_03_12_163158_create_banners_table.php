<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('banners', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('subtitle')->nullable();
        $table->text('description')->nullable();
        $table->string('image');
        $table->string('tag')->default('Limited Edition');
        $table->string('button_text')->default('Shop Now');
        $table->string('button_link')->default('/');
        
        $table->string('category_name')->default('All'); 
        $table->integer('order')->default(0);
        $table->string('text_color')->default('#ffffff'); 
        $table->string('bg_color')->default('#000000'); 
        $table->boolean('is_active')->default(true);
        
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banners');
    }
};
