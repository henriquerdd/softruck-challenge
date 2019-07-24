{{-- resources/views/admin/dashboard.blade.php --}}

@extends('adminlte::page')

@section('content')
    <section class="content-header">
        <h1 class="pull-left">Editando tarefa</h1>
    </section>
    <div class="content">
        <div class="clearfix"></div>
        <div class="box box-primary">
            <div class="box-body">
                <div id='tasks_update'></div>
            </div>
        </div>
    </div>
@stop

@push('js')
    <script type="text/javascript"> var task = @json($task); </script>
    <script type="text/javascript" src="{{ asset('js/components/tasks/tasksUpdate.js') }}"></script>
@endpush