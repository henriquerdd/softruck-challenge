{{-- resources/views/admin/dashboard.blade.php --}}

@extends('adminlte::page')

@section('content')
    <section class="content-header">
        <h1 class="pull-left">Nova tarefa</h1>
    </section>
    <div class="content">
        <div class="clearfix"></div>
        <div class="box box-primary">
            <div class="box-body">
                <div id='tasks_create'></div>            
            </div>
        </div>
    </div>
@stop